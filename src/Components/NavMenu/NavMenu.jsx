import NavItem from '../NavItem/NavItem'
import '../../styles/navMenu.css'
import { Link } from 'react-router-dom'

function NavMenu() {
  const NavOptions = [
    [
      { name: 'Overview', unseen: null },
      { name: 'Transactions', unseen: 3 }
    ],
    [
      { name: 'Transfers', unseen: 2 },
      { name: 'Invoices', unseen: 1 }
    ],
    [
      { name: 'Manage cards', unseen: null },
      { name: 'Manage accounts', unseen: null }
    ],
    [
      { name: 'Team', unseen: null },
      { name: 'Integrations', unseen: null },
      { name: 'Settings', unseen: null }
    ]
  ]

  return (
    <section className="navMenu">
      <header>
        <Link to="/">FINPAL</Link>
      </header>
      <nav>
        {NavOptions.map((option) => {
          return <NavItem key={`${option[0].name}-${option[1].name}`} items={option}></NavItem>
        })}
      </nav>
      <button>UPGRADE ACCOUNT</button>
    </section>
  )
}

export default NavMenu
