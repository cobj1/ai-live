<template>
  <v-container class="h-100">
    <div class="d-flex ga-8">
      <v-card min-width="500px" min-height="800">
        <template #text>
          <audio id="audio" autoplay="true"></audio>
          <video id="video" style="width:600px;" autoplay="true" playsinline="true"></video>
        </template>
      </v-card>

      <v-card min-width="500px" title="Settings">
        <template #text>
          <v-checkbox v-model="useStun" label="Use STUN server"></v-checkbox>
          <div class="d-flex ga-2 mb-4">
            <v-btn :disabled="starting" :loading="loading" loading @click="start()">Start</v-btn>
            <v-btn :disabled="!starting" @click="stop()">Stop</v-btn>
          </div>

          <p class="text-subtitle-2 my-2">Input Message</p>

          <v-textarea v-model="message" label="Message"></v-textarea>

          <v-btn :disabled="message.length == 0" @click="submit">Send</v-btn>
        </template>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
  import {
    onMounted,
    onUnmounted,
    ref
  } from 'vue';

  const starting = ref(false)

  const loading = ref(false)

  const useStun = ref(false)

  const sessionid = ref(0)

  const message = ref(
    "WebRTC 设备之间建立连接先需要获得彼此的 SDP。而设备是无穷无尽的，我们不可能凭空知道任意设备的 SDP，因此需要借助一台第三方服务器交换彼此的 SDP，而这台服务器我们便称之为信令（Signaling）服务器。")

  var pc = null;

  const negotiate = () => {
    pc.addTransceiver('video', {
      direction: 'recvonly'
    });
    pc.addTransceiver('audio', {
      direction: 'recvonly'
    });
    return pc.createOffer().then((offer) => {
      return pc.setLocalDescription(offer);
    }).then(() => {
      // wait for ICE gathering to complete
      return new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          const checkState = () => {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          };
          pc.addEventListener('icegatheringstatechange', checkState);
        }
      });
    }).then(() => {
      var offer = pc.localDescription;
      return fetch('http://192.168.124.56:8010/offer', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }).then((response) => {
      return response.json();
    }).then((answer) => {
      sessionid.value = answer.sessionid
      loading.value = false
      starting.value = true
      return pc.setRemoteDescription(answer);
    }).catch((e) => {
      alert(e);
    });
  }

  const start = () => {
    var config = {
      sdpSemantics: 'unified-plan'
    };

    if (useStun.value) {
      config.iceServers = [{
        urls: ['stun:stun.l.google.com:19302']
      }];
    }

    pc = new RTCPeerConnection(config);

    console.log(pc)
    // connect audio / video
    pc.addEventListener('track', (evt) => {
      if (evt.track.kind == 'video') {
        document.getElementById('video').srcObject = evt.streams[0];
      } else {
        document.getElementById('audio').srcObject = evt.streams[0];
      }
    });

    loading.value = true
    negotiate();
  }

  const stop = () => {
    starting.value = false
    close()
  }

  // close peer connection
  const close = () => {
    console.log("connection")

    setTimeout(() => pc.close(), 500);
  }

  const submit = () => {
    fetch('http://192.168.124.56:8010/human', {
      body: JSON.stringify({
        text: message.value,
        type: 'echo',
        interrupt: true,
        sessionid: parseInt(sessionid.value),
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    message.value = ''
  }

  onMounted(() => {

    // 页面离开时关闭连接
    window.onbeforeunload = function(e) {
      close()

      e = e || window.event
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示'
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示'
    }

    window.onunload = function(event) {
      // 在这里执行你想要的操作
      close()
    };
  })
</script>
