// "use client";

// import { useState, useEffect } from "react";
// nextjs server components
async function getData() {
  const res = await fetch("http://localhost:3000/api/testData")

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  // the usual react way

  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/testData", { cache: "no-store" })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error loading data</p>;
  // }

  const data = await getData()

  async function createTestData(formData) {
    'use server'

    const rawTestData = {
      title: formData.get('title'),
      description: formData.get('description')
    }

    try {
      const response = await fetch('http://localhost:3000/api/testData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawTestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="col">
      <p className="fs-2 text-center">
        <strong>Demo of Fetching Data using API Router</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {data && Array.isArray(data) ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <form action={createTestData}
        method="POST">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <button type="submit">Create Test Data</button>
      </form>
    </div>
  );
}
