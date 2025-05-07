### Dragon News Project :
#### 1.All of setup and install(vite,tailwid,daisyui,react-router) and File Structure create (pages,Layout,Routes,context,service)
#### 2.HomeLayout /Root setup and component create header and themems customaise and add google font and add (npm i date-fns) and {format(new Date()," EEEE , MMMM dd, yyyy")}
#### 3.add marquee (react-fast-marquee) and create Navbar
#### 4. page create left , right, and home all childe show (*:border-2) give onle parent
#### 5.Catories data fetch and add leftHome and map data and dynamic route and a.active{
  text-decoration: underline;
} and CategoryNews add useParam and add rightHome button google
#### 6.Loader and router and CategoryNews add loaderdata



```js
//1.must use
@plugin "daisyui"{
themes : light --default;
}
//2.
const HomeLayout = () => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <section className='left-nav'></section>
        <section>
          <Outlet></Outlet>
        </section>
        <section className='right-nav'></section>
      </main>
    </div>
  );
};
//2.1: thems setup: index.css
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: #403F3F;
  --color-secondary: #D72050;
  --color-base-200: #F3F3F3;
  --color-accent: #706F6F;
}
//use
 <button className='btn btn-primary'>Click now</button>

//3.add marquee (react-fast-marquee)
 <Marquee pauseOnHover={true} speed={30}>
     <p className='font-bold px-5'>Lorem ipsum dolor sit amet consectetur, adipisicing   elit. Sequi illum sed, id mollitia quos magnam</p>
     <p className='font-bold px-5'>Raihan  ipsum dolor sit amet consectetur,     adipisicing elit. Sequi illum sed, id mollitia quos magnam</p>
     </Marquee>

//4. page create left , right, and home

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Header></Header>
       <section className=' w-11/12 mx-auto my-5'>
        <LatestNews></LatestNews>
        <Navbar></Navbar>
       </section>
      </header>
      <main className='mt-10 w-11/12 mx-auto gap-x-2 *:border-2 grid grid-cols-12'>
        <aside className='col-span-3'> <LeftHome></LeftHome> </aside>
          <section className='col-span-6'><Outlet></Outlet></section>
        <aside className='col-span-3'> <RightHome></RightHome> </aside>
      </main>
    </div>
  );
};

//5.Catories data fetch and add leftHome
const CategoryPromise=fetch("/categories.json").then((res)=>{
  return  res.json()})

const Catagores = () => {
  const categories=use(CategoryPromise)
  return (
    <div>
      <h3 className='font-bold text-1xl'>All Category ({categories.length})</h3>
    </div>
  );
};

//6. loader dat
const CategoryNews = () => {
  const {id} =useParams()
  const data=useLoaderData()
  // console.log(data);
  const [categoryNews, setCtegoryNews]=useState("")
  
  useEffect(()=>{
   if(id == "0"){
    setCtegoryNews(data)
    return
   }else if(id=="1"){
    const filterNews=data.filter((news)=>news?.others?.is_today_pick == true)
    setCtegoryNews(filterNews)
   }
   else{
    const filterNews=data.filter((news)=>news.category_id == id)
    console.log(filterNews);
    setCtegoryNews(filterNews)
   }

    
    
  },[data,id])
  return (
    <div>
      CategoryNews {id}
      <h1> Total <span className='font-semibold text-1xl'>{categoryNews.length}</span> News Found</h1>
    </div>
  );
};

```
