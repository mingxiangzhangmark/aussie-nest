
import MyProfileSideBar from "../components/MyProfileSideBar";



export default function Profile() {
 
  return (
    <>

      <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-6 m-4 ml-[22%] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">My profile</h1>
        {/* <p className="text-gray-700">
          Here you can manage your account details, update your information, and configure your settings.
        </p> */}
        <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{'Mark Peter'}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email Address</dt>
                <dd className="text-gray-700 sm:col-span-2">mingxiangzhang_mark@outlook.com</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Gender</dt>
                <dd className="text-gray-700 sm:col-span-2">Male</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Description</dt>
                <dd className="text-gray-700 sm:col-span-2">I am a owner of a small house in Sydney NewTown, and I plan to sell it recently, please email me if you are interested.</dd>
              </div>

              
           
            </dl>
          </div>


      </div>
    </div>
    </>
  )
}
