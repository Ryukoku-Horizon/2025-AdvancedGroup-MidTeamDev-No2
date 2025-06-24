// ファイルをBase64に変換
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
};
  
export const sendToEdge = async (file: File) => {
    const base64 = await fileToBase64(file);
    const res = await fetch("https://[YOUR_PROJECT].supabase.co/functions/v1/upload_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        base64,
      }),
    });
  
    const result = await res.json();
    console.log(result);
};
  