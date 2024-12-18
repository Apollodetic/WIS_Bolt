import React from 'react';
    import { useQuery, gql } from '@apollo/client';

    const GET_CONTENT = gql`
      query GetContent($choice: String!) {
        content(choice: $choice) {
          id
          text
          svgLogo
        }
      }
    `;

    function App() {
      const [choice, setChoice] = React.useState(null);
      const { loading, error, data } = useQuery(GET_CONTENT, {
        variables: { choice },
        skip: !choice,
      });

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div className="App">
          {!choice ? (
            <LandingPage setChoice={setChoice} />
          ) : (
            <ContentDisplay content={data.content} />
          )}
        </div>
      );
    }

    function LandingPage({ setChoice }) {
      return (
        <div className="landing-page">
          <div className="overlay"></div>
          <svg className="logo" viewBox="0 0 100 100">
            {/* SVG content here */}
          </svg>
          <p className="text">Welcome to the Dynamic Website</p>
          <button onClick={() => setChoice('option1')}>Option 1</button>
          <button onClick={() => setChoice('option2')}>Option 2</button>
        </div>
      );
    }

    function ContentDisplay({ content }) {
      return (
        <div className="content-display">
          <h1>{content.text}</h1>
          {/* Additional content based on choice */}
        </div>
      );
    }

    export default App;
