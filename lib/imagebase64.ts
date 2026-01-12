export default async function imagebase64(image : File):Promise<String> {
    const reader = new FileReader();
    reader.readAsDataURL(image);

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string)
    
    reader.onerror = (error) => reject(error)
  });
}