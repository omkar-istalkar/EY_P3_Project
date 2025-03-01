const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Hotel = require('./models/Hotels')
const Dish = require('./models/Dish')
const multer = require('multer')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 5000

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log('Database connected')
).catch(
    (err)=>console.log(err)
)

app.get('/',(req,res)=>{
    res.send('Welcome !!!')
})

app.post('/user-register',async(req,res)=>{
    const {username, email, password} = req.body
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({username,email,password:hashedPassword})
        await user.save();
        res.json({message : "User Registered"})
        console.log("User Regisstration Completed")
    }
    catch{
        console.log(err)
    }
})

app.post('/user-login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message: "Invalid UserName or Password"})
        }
        res.json({message:"Login Successfull",username:user.username})
    }catch(err){
        console.log(err)
    }
})

app.post('/hotel-register',upload.none(), async (req, res) => {
    console.log(req.body)
    const { name, email, password, hname, image } = req.body;
  
    // Validate if password exists
    if (!password || !email || !hname || !image||!name) {
        return res.status(400).json({ message: 'All fields are required including the image.' });
      }
  
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new hotel entry using the Hotel model
      const newHotel = new Hotel({
        owner: name,
        email: email,
        password: hashedPassword,
        h_name: hname,
        h_image: image, // Base64 encoded image
      });
  
      // Save the hotel to the database
      await newHotel.save();
  
      res.json({ message: "Hotel Registered Successfully" });
      console.log("Hotel Registration Completed");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error during hotel registration" });
    }
});
  
app.post('/hotel-login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const hotel = await Hotel.findOne({email});
        if(!hotel){
            return res.status(400).json({message:'Hotel not found!!!'})
        }

        const isMatch = await bcrypt.compare(password,hotel.password)
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password!' });
        }

        res.json({
            hotel:{
                email:hotel.email,
                name:hotel.h_name,
            },
            message:'Login Successful'
        })
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
})

app.post('/add-dish',upload.single('image'),async(req,res)=>{
    const {name,price} = req.body;
    const file = req.file;

    if(!name||!price||!file){
        return res.status(400).json({message:"Fill all necessary fields"})
    }

    try{
        const base64Image = file.buffer.toString('base64')
        const newDish = new Dish({
            name,
            price,
            image:base64Image
        })
        await newDish.save()
        res.status(200).json({message:'Dish added successfull'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Something went wrong'})
    }
    
})

app.get('/get-dishes', async (req, res) => {
    try {
      const dishes = await Dish.find(); // Fetch all dishes from MongoDB
      res.status(200).json(dishes); // Send the list of dishes to the frontend
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch dishes' });
    }
});

app.delete('/delete-dish/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const dish = await Dish.findByIdAndDelete(id);  // Delete the dish by its ID
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found!' });
      }
      res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete dish' });
    }
});

app.get('/api/dishes', async (req, res) => {
    try {
      const dishes = await Dish.find(); // Assuming you are using mongoose to fetch dishes
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dishes' });
    }
});

app.get('/get-dish/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const dish = await Dish.findById(id);
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found!' });
      }
      res.status(200).json(dish);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch dish details' });
    }
});
  

app.listen(PORT,()=>console.log('Server running on Port '+PORT))