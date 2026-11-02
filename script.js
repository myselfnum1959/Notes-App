let btn = document.getElementById('save-btn')
let clock = document.getElementById('clock')
let greeting = document.getElementById('greeting-text')

let greetingPhrases = ["Early bird huh?", "Good morning!", "Lunch time!", "Good afternoon!", "Good evening!"]

btn.addEventListener('click', saveDocument)

function updateClock(){
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    let suffix = "AM"

    if (hour >= 12){
        suffix = "PM"
    } else{
        suffix = "AM"
    }

    if (hour < 6){
        greeting.innerText = greetingPhrases[0]
    } else if (hour >= 7){
        greeting.innerText = greetingPhrases[1]
    } else if (hour >= 12){
        greeting.innerText = greetingPhrases[2]
    } else if (hour >= 13){
        greeting.innerText = greetingPhrases[3]
    } else if (hour >= 17){
        greeting.innerText = greetingPhrases[4]
    }


    clock.innerText = hour + ":" + minute + ":" + second + " " + suffix
}

updateClock()

setInterval(updateClock, 10)

async function saveDocument(){
    const textContent = document.getElementById('note-input').value

    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: 'note.txt',
            types: [
                {
                    description: 'Text Document',
                    accept: {'text/plain': ['.txt']},
                },

                {
                    description: 'Markdown Document',
                    accept: {"text/markdown": [".md"]},
                },

                {
                    description: 'Python File',
                    accept: {'text/python': ['.py']}
                }
        
            ],
        })

        const writable = await handle.createWritable()
        await writable.write(textContent)
        await writable.close()
    } catch(err){
        console.log("Save failed", err);
    }
}