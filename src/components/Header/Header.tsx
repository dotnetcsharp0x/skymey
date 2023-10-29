import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { FooterDivider } from 'flowbite-react/lib/esm/components/Footer/FooterDivider';
import { useState } from 'react';
import Cookies from 'universal-cookie';

function getCookie(key: string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
const cookies = new Cookies();
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cookiesdata, setCookiesdata] = useState("")
  //cookies.set('s','seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRG1pdHJpeSIsImxldmVsIjoiMTIzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJuYmYiOjE2OTgxMzY5MTQsImV4cCI6MTY5ODE5NjkxNCwiaXNzIjoibXlob2xkIiwiYXVkIjoibXlob2xkIn0.iNEnaCke4Vd8BD3zbXzsdhQJwk8xhkscoOCR7uChrnk')
 
  return (
    <>
    <Navbar fluid rounded className='bg-slate-800'>
    <Navbar.Brand href="/" className='max-auto w-20 flex justify-center items-center'>
      <img src="/logo512.png" className="h-11 max-auto content-center" alt="Skyme logo" />
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">name@flowbite.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>    
  </Navbar>
    <hr className="w-full my-2 border-slate-900/40 sm:mx-auto"></hr>
  </>
  )
}
