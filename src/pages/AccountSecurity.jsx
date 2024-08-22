import MyProfileSideBar from "../components/MyProfileSideBar";


export default function AccountSecurity() {
  return (
    <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-6 m-4 ml-[21%] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Account Security</h1>
        <p className="text-gray-700">
          Here you can manage your account details, update your information, and configure your settings.
        </p>
        {/* Add more content here as needed */}
      </div>
    </div>
  )
}
