const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Hotel = require('./models/Hotels')
const Dish = require('./models/Dish')
const Order = require("./models/Order")
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
        const { password: _, ...userData } = user.toObject();

        res.json({
            message: "Login Successful",
            user: userData,
        });
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

        const { password: _, ...hotelData } = hotel.toObject();

        res.json({
            message: "Login Successful",
            hotel: hotelData, // Send full hotel object (without password)
        });
        
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
})

app.post('/add-dish', upload.single('image'), async (req, res) => {
  try {
      const { hotelEmail, name, price } = req.body;
      const file = req.file;

      if (!name || !price || !file) {
          return res.status(400).json({ message: "Fill all necessary fields" });
      }

      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      const newDish = new Dish({
          hotelEmail,
          name,
          price,
          image: base64Image 
      });

      await newDish.save();
      res.status(200).json({ message: 'Dish added successfully', dish: newDish });
  } catch (err) {
      console.error("Error adding dish:", err);
      res.status(500).json({ message: 'Something went wrong' });
  }
});


app.post('/get-dishes', async (req, res) => {
  try {
      const { hotelEmail } = req.body;

      if (!hotelEmail) {
          return res.status(400).json({ message: "Hotel email is required" });
      }

      const dishes = await Dish.find({ hotelEmail }); // Fetch dishes for that hotel
      res.json(dishes);
  } catch (err) {
      console.error("Error fetching dishes:", err);
      res.status(500).json({ message: "Server Error" });
  }
});


app.post('/delete-dish', async (req, res) => {
  try {
      const { dishId, hotelEmail } = req.body;

      if (!dishId || !hotelEmail) {
          return res.status(400).json({ message: "Dish ID and Hotel Email are required" });
      }

      // Ensure the dish belongs to the hotel before deleting
      const dish = await Dish.findOne({ _id: dishId, hotelEmail });

      if (!dish) {
          return res.status(403).json({ message: "Unauthorized: You can only delete your own dishes" });
      }

      await Dish.findByIdAndDelete(dishId);
      res.json({ message: "Dish deleted successfully" });
  } catch (err) {
      console.error("Error deleting dish:", err);
      res.status(500).json({ message: "Server Error" });
  }
});

app.get('/hotel-info/:email',async(req,res)=>{
  try{
    const email = req.params.email;
    const hotel = await Hotel.findOne({email});

    if (!hotel){
      return res.status(404).json({message:"Hotel not found"})
    }

    res.json(hotel)
  } catch(err){
    console.log('Error fetching hotel data : ',err);
    res.status(500).json({message:"Server error"})
  }
})

app.post('/update-hotel/:email',async (req,res) => {
  try{
    const email = req.params.email;
    const updatedHotel = await Hotel.findOneAndUpdate(
      {email : email},
      req.body,
      {new : true}
    )

    if(!updatedHotel){
      return res.status(404).json({message:'Hotel not found'})
    }

    res.json({message : "Hotel data updated successfully", hotel : updatedHotel})
  }catch (err){
    console.error('Error updating hotel data : ', err)
    res.status(500).json({message:"server Error"})
  }
})

app.get('/user-dishes', async (req, res) => {
  try {
      const dishes = await Dish.find();
      res.json(dishes);
  } catch (err) {
      console.error("Error fetching dishes:", err);
      res.status(500).json({ message: "Server Error" });
  }
});

app.get('/get-dish/:dishId', async (req, res) => {
  try {
      const { dishId } = req.params;

      const dish = await Dish.findById(dishId);

      if (!dish) {
          return res.status(404).json({ message: "Dish not found" });
      }

      res.json(dish);
  } catch (err) {
      console.error("Error fetching dish:", err);
      res.status(500).json({ message: "Server Error" });
  }
});

app.post("/place-order", async(req,res) => {
    try{
        const {userEmail, hotelEmail, dishName, price} = req.body;

        if( !userEmail || !hotelEmail || !dishName || !price){
            return res.status(400).json({message : "Missing required fields"})
        }

        const newOrder = new Order({
            userEmail,
            hotelEmail,
            dishName,
            price,
            status : "Pending"
        })

        await newOrder.save()
        res.status(201).json({message : "Order placed successfully", order : newOrder})
    }catch (err){
        console.error("Error placing order : ", err)
        res.status(500).json({message:"Server Error"})
    }
})

app.put("/update-order-status", async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json({ message: `Order ${status}`, order });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/today-orders/:hotelEmail", async (req, res) => {
    try {
        const { hotelEmail } = req.params; // Get hotel email from URL
  
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
  
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
  
        const todayOrders = await Order.find({
            hotelEmail: hotelEmail,
            createdAt: { $gte: todayStart, $lt: todayEnd } // Orders within today
        });
  
        res.json(todayOrders);
    } catch (err) {
        console.error("Error fetching today's orders:", err);
        res.status(500).json({ message: "Server Error" });
    }
  });
  
app.post("/order-history", async (req, res) => {
    try {
        const { hotelEmail } = req.body;

        // Fetch past orders (before the current date)
        const pastOrders = await Order.find({
            hotelEmail: hotelEmail,
            createdAt: { $lt: new Date() } // Orders before the current date
        });

        res.json(pastOrders);
    } catch (err) {
        console.error("Error fetching past orders:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/user-orders", async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      // Validate the input
      if (!userEmail) {
        return res.status(400).json({ message: "Missing user email" });
      }
  
      // Fetch orders for the user
      const userOrders = await Order.find({ userEmail: userEmail });
  
      if (userOrders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      res.json(userOrders);
    } catch (err) {
      console.error("Error fetching user orders:", err);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

app.listen(PORT,()=>console.log('Server running on Port '+PORT))