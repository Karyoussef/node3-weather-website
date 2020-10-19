const request = require('request');
const geocode = (address , callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FyaW1sYWJpYiIsImEiOiJja2ZrM2oyYWEwN2E0MnlvMmI2Y2Y3NzJzIn0.EI26fRU7nMtIkwxPze4izw&limit=1';
    request({url , json:true} , (error,{body} = {})=>{

        if(error){

            callback('unable to connect to location services',undefined)            
        
        }else if(body.message){
            
            callback('invalid location',undefined)
        
        }else if(body.features.length === 0 ){

            callback('unable to find location try another search term',undefined);
            
            
            
        }else{

            data= {
                
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            
            }
            callback(undefined,data);
        }
        
       
        
    })

}

module.exports = geocode;
