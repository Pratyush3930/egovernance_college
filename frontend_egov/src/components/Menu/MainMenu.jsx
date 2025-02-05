import BillMenu from "./BillMenu"
const MainMenu = () => {
    const billMenu = {
        menuName: "My Bills",
        menuItems: ["Current Bills", "Pending Bills"]
    }

    const profileMenu = {
        menuName: "Profile",
        menuItems: ["Manage Branch", "Manage Payments", "Manage Consumers","Manage Bills","Search"]
    }
  return (
    <div className="flex flex-col h-full gap-4 my-8 mx-4">
      <h3><BillMenu menu={profileMenu}/></h3>
      <h3>My Previous Payments</h3>
      <h3><BillMenu menu={billMenu}/></h3>
      <h3>Support Center</h3>
      <h3>No light Contact</h3>
      <h3>Logout</h3>
    </div>
  )
}

export default MainMenu