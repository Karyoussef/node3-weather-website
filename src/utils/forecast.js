
const request = require('request');
const forecast = (lat,long,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=43697a8067a3d2d70710caa84f40a44e&query='+lat+','+long+'&units=m';

    request({url , json: true}, (error,{body} = {}) => {

        if(error){

           callback({message: 'Unable to connect to weather service!'},undefined)
        
        }else if(body.error){
        
            callback({message: 'Unable to find location'} , undefined)
        
        }else{    
            
            const temperature = body.current.temperature;
            const feels = body.current.feelslike;
            const description = body.current.weather_descriptions[0] ; 
            
            callback(undefined,description+'. It is '+temperature+' degrees out. It feels like '+ feels+ ' in ');
            
        }
    });


}
module.exports = forecast;