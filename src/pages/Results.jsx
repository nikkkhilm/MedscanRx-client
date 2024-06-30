import React from 'react';

const Result = ({ results }) => {
  const allAdverseEffects = Object.entries(results).reduce((acc, [drugName, adverseEffects]) => {
    return acc.concat(adverseEffects.map((effect) => ({ drugName, effect })));
  }, []);

  return (
    <div className="results-container">
      <h1>INFORMATION AND ADVERSE EFFECTS</h1>
      {allAdverseEffects.length > 0 ? (
        <div className="result-card">
          <ul>
            {allAdverseEffects.map(({ drugName, effect }, index) => (
              <li key={index}>
                {/* <strong>{drugName}:</strong>  */}
                {effect}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Upload any image to display results</p>
      )}
    </div>
  );
};

export default Result;
