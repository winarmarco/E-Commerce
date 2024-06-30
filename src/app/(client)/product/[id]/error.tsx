'use client';

const Error: React.FC<{error: Error}> = ({error}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Product not found :/</h1>
    </div>
  )
}

export default Error