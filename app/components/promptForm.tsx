import { useState } from 'react';
import Image from 'next/image';



// .\webui --nowebui --cors-allow-origins=http://localhost:3000

const PromptForm = () => {


  //todo: maybe change these useStates to just 1 array and have generatedImage just be the first element
  const [generatedImage, setGeneratedImage] = useState<string>("/woman.png")
  const [prevGeneratedImage, setPrevGeneratedImage] = useState<string[]>([])

  
    // Handler for form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const url = 'http://127.0.0.1:7861/sdapi/v1/txt2img';
      const data = {
        "key": "enterprise_api_key",
        "model_id": "model_id",
        "prompt": "ultra realistic portrait ((beautiful pale female)), large eyes, hyper detail, cinematic lighting, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K",
        "negative_prompt": "painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs, anime",
        "width": "512",
        "height": "512",
        "samples": "1",
        "num_inference_steps": "20",
        "safety_checker": "no",
        "enhance_prompt": "yes",
        "seed": null,
        "guidance_scale": 7.5,
        "multi_lingual": "no",
        "panorama": "no",
        "self_attention": "no",
        "upscale": "no",
        "embeddings_model": null,
        "lora_model": null,
        "clip_skip": "2",
        "tomesd": "yes",
        "use_karras_sigmas": "yes",
        "vae": null,
        "lora_strength": null,
        "scheduler": "UniPCMultistepScheduler",
        "webhook": null,
        "track_id": null
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(responseData => {
          if (generatedImage == "") {
            setGeneratedImage(responseData.images[0])
          } else {
            setPrevGeneratedImage((prev)=>{return [...prev, responseData.images[0]];}) 
          }
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

    return (
      <>
        <div className="flex justify-center">

          <div className="w-1/2">
            <div className="flex justify-center p-4">
              <Image className='rounded-md justify-center w-4/5 m-2' src = {prevGeneratedImage[0] ? `data:image/png;base64,${prevGeneratedImage[prevGeneratedImage.length - 1]}`: generatedImage} alt = 'AI Generated Image' width={500} height={500} />
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              <input className="w-4/5 h-16 bg-gray-300 px-4 border-b-2 placeholder-gray-800 border-gray-600 focus:border-transparent" placeholder='Enter prompt here...' type="text" name="hr_upscaler"  />
              <input className="w-4/5 h-16 bg-gray-300 px-4 border-b-2 placeholder-gray-800 border-gray-600 focus:border-transparent" placeholder='Enter negative prompts here...' type="text" name="hr_upscaler" />
              <button type="submit" className="mt-4 px-4 border-b-2 border-gray-600 text-gray-800">Submit</button>
            </form>

          </div>

          {/* data:image/png;base64, */}
          {prevGeneratedImage.length ? (    <div className="w-1/2">
            <div className="flex-1 flex flex-wrap p-4 justify-center">
              { prevGeneratedImage.slice(0, -1).map((img, i) => <Image key={i} className='m-2 rounded-xl transition-all duration-300 ease-in-out transform-gpu hover:z-50 hover:scale-110 ' src={`data:image/png;base64,${img}`} alt = 'AI Generated Image' width={250} height={250} />).reverse() }
            </div>
          </div>): null}
      
        
        </div>
      
        

      
    </>
    );
  };
  
  export default PromptForm;
  