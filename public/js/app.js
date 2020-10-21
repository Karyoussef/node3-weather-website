
document.addEventListener('DOMContentLoaded', ()=>{
    const weatherForm = document.querySelector('form')
    
    weatherForm.addEventListener('submit' , (event)=>{

        event.preventDefault()
        
        const address = document.querySelector('input').value;

        const result = document.querySelector('#result')

        result.innerText = 'Loading...'

        fetch('/weather?address='+address).then((res)=>{

            res.json().then((data)=>{
        
                if(data.error){
                    return result.innerText = data.error;
                }
                result.innerText = data.location + ' ' + data.forecastData;
                console.log(data.location);
                console.log(data.forecastData); 

            })

        }) 

        console.log(address)
    
    })


})

    