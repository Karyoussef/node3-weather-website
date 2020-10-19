const path = require('path');
const express = require('express'); //express is JUST a function
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { groupEnd } = require('console');


//define paths for express config
const staticPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static dir to serve
app.use(express.static(staticPath))


app.get('', (req, res)=>{

    res.render('index',{

        title:'Weather',
        name: 'Karim Labib'
        
    })

})

app.get('/about' , (req, res) =>{

    res.render('about', {

        title:'About me',
        name: 'Karim Labib'

    })

})

app.get('/help' , (req, res) => {

    res.render('help',{
        title:'Help page',
        text: 'NO help',
        name:'Karim Labib'
    })


})

app.get('/weather', (req,res)=>{

    if(!req.query.address){

        return res.send({

            error: 'you must provide an address!'

        });

    }
    geocode(req.query.address,(error, {lat,long,location} = {} )=>{
        if(error){
            return res.send({error})
        }else{
        
            forecast(lat,long,(error,forecastData)=>{
               
                if(error){
                    return res.send({error})
                }
                // console.log('data ',forecastData+location)
                res.send({
                    forecastData,
                    location,
                    address: req.query.address
                })
            });
        }
        

    })
    // res.send({
    //     forcast: 'temperature is 22 Celsius',
    //     location: 'Vaihingen',
    //     address: req.query.address
    // });
})

app.get('/products', (req,res)=>{
    console.log(req.query)
    if(!req.query.search){

        res.send('ERROR')
    }else{
        
        res.send({

            products : [] 

        })
    }
   

})

app.get('/help/*' , (req,res)=>{

    res.render('404',{

        title: '404',
        name: 'Karim Labib',
        errorMsg: 'Help article not found'

    })

})

app.get('*', (req,res)=>{

    res.render('404',{

        title: '404',
        name: 'Karim Labib',
        errorMsg: 'PAGE NOT FOUND'

    })

})


app.listen(3000, ()=>{

    console.log('Server is up on port 3000');

})