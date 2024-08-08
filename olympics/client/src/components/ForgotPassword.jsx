
const ForgotPassword = () => {
  return (
    <div className="mt-8">
      
      

      <div className="bg-indigo-600 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 rounded-full p-3 md:p-4">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF">
      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
    </svg>
  </div>

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        
        
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
            </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Enter your email:</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset Password</button>
      </div>
    </form>

  </div>
</div>
    </div>
  )
}

export default ForgotPassword