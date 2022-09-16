import mongo from '../db/db.js';

let db = await mongo();
const seedCategories=[
    {image:"https://user-images.githubusercontent.com/106850140/190209382-c8306150-09d3-46fa-8756-53cbd332ac3a.png",
    title:"Headsets"},
    {image:"https://user-images.githubusercontent.com/106850140/190319043-c25cd240-a162-4098-9faa-a92c277e5708.png",
    title:"PCS Gamer"},
    {image:"https://user-images.githubusercontent.com/106850140/190209392-453d6888-a98f-4ea4-b6e5-47d3c1426acb.png",
    title:"Teclados"},
    {image:"https://user-images.githubusercontent.com/106850140/190209389-3adc8c5d-d9e9-4d25-b466-f63dde8d296f.png",
    title:"Mouses"}

]
const seedProducts =[
    
    {
    headsets:[
    {title:"Headset Gamer Bluetooth JBL", value:"1109,90", image:"https://user-images.githubusercontent.com/106850140/190312342-d67ca2d8-82a5-4d64-a279-9e9eebb5cb5e.jpg"},
    {title:"Headset Gamer Hyperx Cloud Stinger", value:"329,99", image:"https://user-images.githubusercontent.com/106850140/190312348-79c7aa7d-8857-4082-a602-c685db2ff30e.jpg"},
    {title:"Headset Gamer Razer Kraken X", value:"299,99", image:"https://user-images.githubusercontent.com/106850140/190312373-b912a923-0fbc-4f6a-be06-c4f4b6e30f14.jpg"},
    {title:"Headset Gamer Redragon Zeus X",value:"499,99",image:"https://user-images.githubusercontent.com/106850140/190312376-74ae60f6-7ff5-4a51-bab0-bc92fe9ceb33.jpg"},
    {title:"Headset Gamer Husky Storm V2",value:"101,99",image:"https://user-images.githubusercontent.com/106850140/190312383-38305a6c-b1d9-4097-851f-97d6266d5225.jpg"}
    ]
    },
    {
    pcs:[
    {title:"PC Gamer Concordia Core i7-10700f,Geforce RTX3060 12GB ",value:"9099,99",image:"https://user-images.githubusercontent.com/106850140/190312222-7d9044e2-c95a-4aab-8955-a075b3310068.jpg"},
    {title:"PC Gamer Fácil Amd Ryzen 5 5600g Radeon Vega 7 Graphics 16GB",value:"3027,20",image:"https://user-images.githubusercontent.com/106850140/190312269-daaf757e-4445-4ee8-95dd-28d7982cdc51.jpg"},
    {title:"PC Gamer Skul 3000 I3-10100F, Radeon RX 550",value:"2999,99",image:"https://user-images.githubusercontent.com/106850140/190312275-f2cf23dd-8f19-4595-9939-0fb528210834.jpg"},
    {title:"PC Gamer Acer Predator Orion 5000 Intel Core i7-11700",value:"10999,99",image:"https://user-images.githubusercontent.com/106850140/190312281-78b8ed21-6c26-41cb-9033-9d207f5dbe2d.jpg"},
    {title:"PC Gamer Concórdia AMD Ryzen 3-3200G,",value:"2259,99",image:"https://user-images.githubusercontent.com/106850140/190312286-82f336c0-141c-4897-9917-d60d9bf9586e.jpg"}
    ]
    },
    {
    teclados:[
        {title:"Teclado Mecânico Gamer Redragon Kumara",value:"349,90",image:"https://user-images.githubusercontent.com/106850140/190312403-eab09137-12f4-48d9-8a14-f899ca93bb33.jpg"},
        {title:"Teclado Mecânico Gamer Hyperx Alloy MKW100",value:"499,99",image:"https://user-images.githubusercontent.com/106850140/190312414-fef163b7-1ecc-4c68-830d-2f0e3665a119.jpg"},
        {title:"Teclado Mecânico Gamer T Dagger Bora",value:"299,99",image:"https://user-images.githubusercontent.com/106850140/190312439-a534a3ae-95f5-477c-8703-7ea571293051.jpg"},
        {title:"Teclado Mecânico Gamer Husky Gaming Blizzard",value:"449,99",image:"https://user-images.githubusercontent.com/106850140/190312443-b89e78f4-5ca6-4eed-8f13-bd07d8937388.jpg"},
        {title:"Teclado Semi Mecânico Gamer Vinik VX Gaming Hydra",value:"117,99",image:"https://user-images.githubusercontent.com/106850140/190312445-eeedd5d0-34a5-41f1-9a8f-ae3af07eb91b.jpg"}
    ]
    },
    {
    mouses:[
        {title:"Mouse Gamer Redragon Cobra",value:"149,90",image:"https://user-images.githubusercontent.com/106850140/190312621-6b949833-73b7-4527-aeac-442acc6133e2.jpg"},
        {title:"Mouse Gamer Logitech G403 HERO",value:"269,99",image:"https://user-images.githubusercontent.com/106850140/190312631-1f879c04-79c7-470f-8304-1967e8893693.jpg"},
        {title:"Mouse Gamer HyperX Pulsefire Core",value:"98,99",image:"https://user-images.githubusercontent.com/106850140/190312633-72751aa1-591b-4a96-93c1-d603f8697e19.jpg"},
        {title:"Mouse Gamer Razer Deathadder V2 Chroma",value:"229,99",image:"https://user-images.githubusercontent.com/106850140/190312639-89a376b1-7714-4d90-9417-1fdcec02b5f9.jpg"},
        {title:"Mouse Gamer Corsair Harpoon PRO",value:"101,99",image:"https://user-images.githubusercontent.com/106850140/190312643-15d3423a-3a45-49e5-a380-cc502876d039.jpg"}
    ]
    }
];

const seedDB= async ()=>{
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(seedProducts);
    await db.collection('categorie').deleteMany({});
    await db.collection('categorie').insertMany(seedCategories);
}
seedDB()
async function getProducts (req,res){
    try {
        const products = await db.collection('products').find().toArray();
        const categorie = await db.collection('categorie').find().toArray();

        const final = {products:products,categorie:categorie}
        res.send(final);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }


}
export {getProducts}