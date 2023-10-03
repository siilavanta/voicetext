// const voicetext = document.getElementById('voicetext');
// const voicebtn = document.getElementById('voicebtn');


// voicebtn.addEventListener('click', function () {
//     var speech = true;
//     window.SpeechRecognition = window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true;
//     recognition.addEventListener('result', e => {
//         const transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//         voicetext.innerHTML = transcript.join();
//         console.log(transcript.toString())
//     })
//     if (speech == true) {
//         recognition.start();
//         recognition.addEventListener('end', recognition.start);
//     }

// })

const voicetext = document.getElementById('voicetext');
const voicebtn = document.getElementById('voicebtn');
const text = document.getElementById('text')
const stopbtn = document.getElementById('stopbtn')
const timeEl = document.getElementById('time')

let final_transcript = "";
let froceStop = false;
let ms = 0
voicebtn.addEventListener('click', function () {
    setInterval(function(){
        timeEl.innerHTML = " time : " + ++ms
    }, 1000)
    var speech = true;
    const recognition = new webkitSpeechRecognition() // Use webkitSpeechRecognition for Safari
    recognition.lang = 'bn-BD'; // Set the language to Bengali (Bangladesh)
    froceStop = false
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    // recognition.continuous = true;

    recognition.maxAlternatives = 1;
   
    let run = []
    recognition.addEventListener('result', e => {
        let interim_transcript = "";
        // console.log( e.results)
        const transcript = Array.from(e.results).forEach((data) => {

            if (data.isFinal) {
                //    console.log(data[0].transcript)

                // console.log(run)
                //run = []
                //text.innerHTML = text.textContent+ " " + voicetext.innerHTML
                text.innerHTML = text.textContent  + " " + data[0].transcript;
                voicetext.innerHTML = data[0].transcript;
                run = []
            } else {
                run.push(data[0].transcript)
                voicetext.innerHTML = data[0].transcript;
                //console.log(run)
            }
            // run.push(data[0].transcript)
            //console.log(run[run.length-2] ? run[run.length-2] : '' + " "   + run[run.length-1] ? run[run.length-1] : '')

          console.log(data[0].transcript)
        })

        //  console.log(transcript)
        // .map(result => result[0])
        // .map(result => result.transcript);


        // console.log(transcript)
        // text.innerHTML = text.textContent+ " " + transcript.join(' ')
        // console.log(transcript.join(' '));
    });

   

    if (speech) {

        recognition.start();
        recognition.addEventListener('end', () => {
          //  console.log('end')
            // text.innerHTML = text.textContent+ " " + voicetext.innerHTML
            // if (!froceStop) {
                recognition.start();
            // }
        });
    }

    recognition.addEventListener("nomatch", () => {
        //console.error("Speech not recognized");
    });

    recognition.addEventListener("soundend", (event) => {
        //console.log("Sound has stopped being received");
    });

    recognition.onaudiostart = () => {
        // console.log("Audio capturing started");
    };

    recognition.onspeechstart = () => {

        //console.log(run[0])
        //let finaltext = run[run.length-2] ? run[run.length-2] : '' + " "   + run[run.length-1] ? run[run.length-1] : ''
        //text.innerHTML = text.textContent + " " + run[run.length-2] ? run[run.length-2] : ""
        //run = []
       // console.log("Speech has been detected");
    };
    recognition.onspeechend = () => {
        // let finaltext = run[run.length-2] ? run[run.length-2] : '' + " "   + run[run.length-1] ? run[run.length-1] : ''
        // text.innerHTML = voicetext.innerHTML+ " " + finaltext ? finaltext : ''

        //run = []
       // console.log("Speech has been closeed");
    };
    recognition.onaudioend = () => {

        //run = []
        //console.log("Audio capturing ended");
    };

    stopbtn.addEventListener('click', () => {
        recognition.abort();
        froceStop = true
    })

});

async function audio(){
    try {
        // navigator.webkitGetUserMedia({ audio: true })
        //const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        //console.log('Microphone access granted');

        //console.log(stream)
        // You can now use the `stream` object to work with the microphone.
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

audio()
