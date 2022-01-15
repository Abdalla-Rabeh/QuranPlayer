let audio = document.querySelector('.quranPlayer'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    play = document.querySelector('.play'),
    surahs = document.querySelector('.surahs');
    //
    // 
    getSurahs();
    function getSurahs(){
        fetch('https://api.quran.sutanlab.id/surah').then(Response => Response.json())
        .then(data => {
            for (let sur in data.data) {
               surahs.innerHTML+=`
               <div>
               <p>${data.data[sur].name.long}
               ${data.data[sur].name.transliteration.en}
               </p>`

            }
            let AllSurahs = document.querySelectorAll('.surahs div'),
                AyahsAudio ,
                AyahsText ;          
           AllSurahs.forEach((sur,index)=>{
              sur.addEventListener('click',()=>{
                fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
                .then(Response => Response.json())
                .then(data =>{
                    let verse = data.data.verses;
                    AyahsAudio = [];
                    AyahsText = [];
                   verse.forEach( verse => {
                    AyahsAudio.push(verse.audio.primary)
                    AyahsText.push(verse.text.arab)
                    })
                    let indexAd = 0;
                    chengeIndex(indexAd)
                    audio.addEventListener('ended',()=>{
                        indexAd++;
                        if( indexAd < AyahsAudio.length){
                            chengeIndex(indexAd)
                        }else{
                            indexAd = 0
                            chengeIndex(indexAd)
                            audio.pause()
                            isPlaying = true
                            togglePlay()
                        }
                    })
                    next.addEventListener('click', () =>{
                        indexAd < AyahsAudio.length -1 ? indexAd++ : indexAd = 0
                        chengeIndex(indexAd)
                    })
                    prev.addEventListener('click', () =>{
                        indexAd == 0 ? indexAd = AyahsAudio.length -1 : indexAd--;
                        chengeIndex(indexAd)
                    })
                    let isPlaying = false
                    togglePlay()
                    function togglePlay(){
                        if(isPlaying){
                            audio.pause()
                            play.innerHTML=`<i class="fas fa-play"></i>`
                            isPlaying = false
                        }
                        else{
                            audio.play()
                            play.innerHTML=`<i class="fas fa-pause"></i>`
                            isPlaying = true
                        }

                    }
                    play.addEventListener('click', togglePlay)
                    function chengeIndex(index){
                        audio.src = AyahsAudio[index]
                        ayah.innerHTML=AyahsText[index]
                    }
                })
              })
           })
        })
    }


