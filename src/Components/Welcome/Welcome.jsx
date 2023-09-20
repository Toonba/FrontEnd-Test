import { Link } from 'react-router-dom'
import '../../styles/welcome.css'

function Welcome() {
  return (
    <section className="welcome">
      <header></header>
      <div>
        <h2>Welcome to FINPAL</h2>
        <p>
          To see your Transactions please click <Link to="/transactions">Here</Link>
        </p>
      </div>
    </section>
  )
}

export default Welcome
