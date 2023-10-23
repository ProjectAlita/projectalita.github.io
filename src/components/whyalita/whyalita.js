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

  const coreFeatures = [
    {
      title: 'yout team',
      description: 'Alita provide project-centric space to collaborate and share prompts, embeddings build with project data, AI chains to easily augment required processes with it'
    },
    {
      title: 'yout chat',
      description: 'Alita integrates with your corporate messengers such as MS Teams or Slack to provide a seamless experience for your team members'
    },
    {
      title: 'your IDE',
      description: 'Alita integrates with your Favorite IDE such as VS Code or JetBrains to empower developers with AI without leaving their environment'
    },
    {
      title: 'your tools',
      description: 'Alita’s API interface can be used to integrate it into your specific tools like Jira, Azure DevOps, Service Now and more to provide additional AI capabilities on a fingertips.'
    },
    {
      title: 'your data',
      description: 'Alita integrates with your data sources, like Git or Confluence to enable your prompts with better context and more relevant suggestions'
    },
    {
      title: 'Your workflows',
      description: 'Alita provide configurable flows and chains to enable multi-step data processing and combine data from multiple sources to get crispier outcomes'
    }
  ]

  // Render the Why Alita component
  return (
    <div className="container">
      <div>
          <div>
              <h2>Your environment - your rules</h2>
              <p>
                  Alita implements a secure product-centric approach to delivery process
                  augmentation with needed generative AI capabilities through convenient
                  interfaces for all actors within the SDLC.
              </p>
          </div>
          <div className="container container-flex pb-0">
              {coreFeatures.map((benefit, index) => (
              // Render a card for each benefit
              <div key={index} className="card">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
              </div>
              ))}
          </div>
        </div>
        <div className="container">
            <h4>Core principles</h4>
            <div>
              {
                benefits.map((feature, index) => (
                  <p className='mt-0 mb-0'><span>{feature.title}</span> {feature.description}</p>
                ))
              }
            </div>
        </div>
    </div>
  );
};

export default WhyAlita;

// The WhyAlita component renders a section with a header, a textual explanation of the core concept, and a set of cards highlighting the benefits of Alita. The benefits are stored as an array of objects and mapped to individual cards.