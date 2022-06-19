import { NavLink } from "react-router-dom"

function LandingPage() {
  return (
    <>
      <div>
        <p>Landing Page</p>
        <NavLink to="/multiplayer">
          <button>Multiplayer</button>
        </NavLink>
      </div>
    </>
  )
}

export default LandingPage;