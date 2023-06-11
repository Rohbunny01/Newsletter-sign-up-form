"use client"

import Image from 'next/image'
import mobile from '../assets/images/illustration-sign-up-mobile.svg'
import checkmark from '../assets/images/icon-list.svg'
import desktop from '../assets/images/illustration-sign-up-desktop.svg'
import { useFormik } from "formik";
import Success from './success';
import { use, useState } from "react";

interface FormValues {
  email: string;
}
interface SuccessProps {
  email: string;
  setSuccess: (value: boolean) => void;
}

export default function Home() {
  const [success, setSuccess] = useState<boolean>(false);

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
      errors.email = "Valid email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Valid email required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values: FormValues) => {
      console.log("Form submitted successfully");
      setSuccess(true);
    },
  });

  return (
    <>
      {!success && (
        <div className='md:flex md:items-center md:justify-center md:h-screen bg-slate-800'>
          <section className='md:[700px] lg:w-[900px] bg-slate-50 md:flex md:flex-row-reverse md:items-center md:rounded-3xl md:p-8 md:mx-8 md:gap-12'>
            <div className='mb-8 md:hidden'>
              <Image src={mobile} alt="News Letter" height={250} width={768}/>
            </div>

            <div className='hidden md:block md:flex-1'>
              <Image src={desktop} alt="News Letter" height={250} width={768}/>
            </div>

            <div className='py-6 px-6 md:flex-1'>
              <h1 
              className='text-slate-900 font-bold text-4xl lg:text-5xl'>Stay updated!
              </h1>

              <p 
              className='py-6'>Join 60.000+ product managers receiving monthly updates on:
              </p>

              <ul className='flex flex-col gap-4'>
                <li className='flex gap-4 font-semibold items-start'
                ><Image src={checkmark} height={24} width={24} alt='checkmark'/> Product discovery and building what matters
                </li>
                
                <li className='flex gap-4 font-semibold items-start'><Image src={checkmark} height={24} width={24} alt='checkmark'/>Measuring to ensure updates are a success
                </li>

                <li className='flex gap-4 font-semibold items-start'><Image src={checkmark} height={24} width={24} alt='checkmark'/>And much more!
                </li>

              </ul>
              
              <form onSubmit={formik.handleSubmit}
              className='mt-10'>
              <article className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-slate-900 font-bold text-sm mb-2"
                  >
                    Email address
                  </label>
                  {formik.errors.email ? (
                    <p className="text-sm text-rose-500 font-bold">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </article>

              <input 
                type="email" 
                id='emailInput' 
                name='email'
                placeholder='email@company.com'
                className={`w-full border rounded-lg py-4
                px-6 mb-6 border-gray-400 outline-none focus:border-slate-600 ${
                  formik.errors.email &&
                  "bg-rose-100 border-rose-400 focus:border-rose-400"
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
              />

              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              
              
              <button 
                
                type='submit' 
                className='w-full text-white p-5 font-bold text-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500
                rounded-lg'
                style={{backgroundColor: 'hsl(234, 29%, 20%)'}}
                >
                  Subscribe to monthly newsletter
              </button>
            </form>
            </div>

            
        </section>
        </div>
       )}

      {success && (
        <Success email={formik.values.email} setSuccess={setSuccess} />
      )}
    </>
  );
}
