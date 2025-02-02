import React, {useState, useEffect} from 'react'
import useAuthStore from '../store/authStore';

function Profile() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const { updateUserProfile, getUserDetails } = useAuthStore();

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetails().then(({ success, user }) => {
      if (success) {
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setBio(user.bio || '');
        setEmail(user.email || '');
        setUsername(user.username || '');
      }
    });
  }, [getUserDetails]);

  const handleSave = async () => {
    const { success, errorMessage } = await updateUserProfile(firstName, lastName, bio);
    if (!success) {
      setError(errorMessage);
        getUserDetails();
    }
  };
  return (
    <div className='p-9 w-full flex flex-col items-center'>

            <h1 className='text-2xl font-extrabold text-start'>Edit Profile</h1>


            <div className='w-full lg:w-2/6'>

                    <div className='mt-12 grid grid-cols-2 gap-3 items-center'>

                        <div>
                            <div className="avatar online">
                            <div className="w-48 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                            </div>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <input type="file" className="file-input file-input-bordered w-full" />
                            <div className="divider"></div> 
                            <button className='btn btn-outline'>Delete Picture</button>
                        </div>

                    </div>

                    <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-12'>

                        <label className="form-control">
                            <div className="label">
                            <span className="label-text">First Name</span>
                            </div>
                            <input
                            type="text"
                            placeholder="First Name"
                            className="input input-bordered w-full"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>

                        <label className="form-control">
                            <div className="label">
                            <span className="label-text">Last Name</span>
                            </div>
                            <input
                            type="text"
                            placeholder="Last Name"
                            className="input input-bordered w-full"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>

                        <label className="form-control col-span-1 md:col-span-2 lg:col-span-2">
                            <div className="label">
                            <span className="label-text">Email</span>
                            </div>
                            <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            readOnly
                            />
                        </label>


                        <label className="form-control col-span-1 md:col-span-2 lg:col-span-2">
                            <div className="label">
                            <span className="label-text">Username</span>
                            </div>
                            <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered w-full"
                            value={username}
                            readOnly
                            />
                        </label>


                        <label className="form-control col-span-1 md:col-span-2 lg:col-span-2">
                            <div className="label">
                            <span className="label-text">Your bio</span>
                            </div>
                            <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </label>
                                        
                        <button className="btn btn-neutral col-span-1 md:col-span-2 lg:col-span-2" onClick={handleSave}>
                            Save
                        </button>

                        <div>{error && <p className="mt-4 text-sm text-red-700 text-center rounded-md bg-red-100 border border-red-400 p-4">{error}</p>}</div>



                    </form>







            </div>
      
    </div>
  )
}

export default Profile
