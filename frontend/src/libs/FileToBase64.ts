export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // data:image/png;base64,xxxx
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };