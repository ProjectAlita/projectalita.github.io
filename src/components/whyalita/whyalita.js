// Create a reactJS Component for Why Alita section
// Header of the section is How Alita Can Help You
// Then there is textual explanation of core concept "Alita implements secure product centric approach of delivery process augmentation with needed generative AI capabilities through convenient interfaces for all actors within SDLC"
// Then there is a cards highlighing the benefits of Alita
// Security - Alita restrics access to the data to the team members only and not shared with third parties
// Integration - Alita brings AI close to the team and integrates with the tools you already use
// Flexibility - Alita is completely cloud and model agnostic that allows you use in your specific environment
// Customization - Alita is disugned to enable fair level of customization to build your own AI powered workflows
import React from 'react';

// Define a functional React component for the Why Alita section
const WhyAlita = () => {
  // Define the benefits of Alita as an array of objects
  const benefits = [
    {
      title: 'Security',
      description:
        'Alita restricts access to the data to the team members only and is not shared with third parties.',
    },
    {
      title: 'Integration',
      description:
        'Alita brings AI close to the team and integrates with the tools you already use.',
    },
    {
      title: 'Flexibility',
      description:
        'Alita is completely cloud and model agnostic that allows you to use it in your specific environment.',
    },
    {
      title: 'Customization',
      description:
        'Alita is designed to enable a fair level of customization to build your own AI-powered workflows.',
    },
  ];

  // Render the Why Alita component
  return (
    <div className="container">
        <div>
            <h2>Why Alita?</h2>
            <p>
                Alita implements a secure product-centric approach to delivery process
                augmentation with needed generative AI capabilities through convenient
                interfaces for all actors within the SDLC.
            </p>
        </div>
        <div className="container container-flex">
            {benefits.map((benefit, index) => (
            // Render a card for each benefit
            <div key={index} className="card">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default WhyAlita;

// The WhyAlita component renders a section with a header, a textual explanation of the core concept, and a set of cards highlighting the benefits of Alita. The benefits are stored as an array of objects and mapped to individual cards.