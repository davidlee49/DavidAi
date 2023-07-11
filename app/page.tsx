'use client'

import './globals.css';
import PromptForm from './components/promptForm';

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-screen bg-gray-300">


        <main className="bg-gray-300 flex justify-center min-h-screen">
            <div className='text-center w-3/5 h-max  border-gray-400'>
                
                <header className='text-7xl mt-10 mb-9 text-blue-950'> David AI </header>
                
                <div className="border-t border-gray-400"></div>

                    
                <PromptForm></PromptForm>
                    
                
            </div>
        </main>


       
      </div>
    </>
  
  )
}
