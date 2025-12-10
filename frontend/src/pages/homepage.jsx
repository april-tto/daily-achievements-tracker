import '../App.css'
import Navbar from '../components/navbar'
import Taskbox from '../components/taskbox'

export default function Homepage() {
  return (
    <div>
      <Taskbox />
      <Navbar />
    </div>
  )
}