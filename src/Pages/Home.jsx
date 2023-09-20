import NavMenu from '../Components/NavMenu/NavMenu'
import SidePanel from '../Components/SidePanel/SidePanel'
import Welcome from '../Components/Welcome/Welcome'


function Home(){
  return (
    <>
      <NavMenu/>
      <Welcome/>
      <SidePanel/>
    </>
  )
}

export default Home