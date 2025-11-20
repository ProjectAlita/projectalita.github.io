# ProjectAlita Landing Page

A modern, interactive Next.js landing page for ProjectAlita, featuring 3D elements and smooth animations.

> **Note**: This is the landing page component of the unified ProjectAlita deployment.  
> For complete setup instructions, see the [main README](../README.md) in the root directory.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Development

**From repository root:**
```bash
# Start landing page only
./scripts/dev-landing.sh

# Or start both landing + docs
./scripts/dev-all.sh
```

**From this directory:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build for Production
```bash
# Build static files (creates out/ directory)
npm run build
```

The build output in `out/` will be automatically deployed as part of the unified GitHub Pages deployment.

## 🎨 Design Features

### Modern Aesthetic
- **Monax-inspired design** with 3D geometric shapes
- **Asymmetric layouts** for visual interest
- **Bold typography** with Inter font family
- **Gradient backgrounds** and smooth transitions

### Interactive Elements
- **Framer Motion animations** for smooth interactions
- **3D shapes** that rotate and respond to hover
- **Video modal integration** for YouTube experiments  
- **Phase-based filtering** for experiment showcase

### Component Architecture
- **HeroSection**: Main landing with 3D elements and metrics
- **PhaseTimeline**: Visual journey through 3-phase strategy
- **ExperimentShowcase**: Filterable grid of video experiments
- **ThreeDShape**: Reusable 3D geometric components

## 📱 Features

### Hero Section
- Animated 3D shapes in background
- Real-time metrics dashboard
- Floating contextual badges
- Responsive layout with visual cards

### Phase Timeline
- Interactive timeline visualization
- Progress indicators for each phase
- 3D preview cards for each phase
- Alternating layout pattern

### Experiment Showcase
- YouTube video integration
- GitHub repository links
- Phase-based filtering system
- Modal video player
- Animated card transitions

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and interactions
- **Lucide React** - Modern icon library

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Home page composition
└── components/
    ├── HeroSection.tsx      # Main hero with 3D elements
    ├── PhaseTimeline.tsx    # Journey visualization
    ├── ExperimentShowcase.tsx # Video showcase grid
    └── ThreeDShape.tsx      # Reusable 3D components
```

## 🎯 Content Management

### Adding New Experiments
Update the experiments array in `ExperimentShowcase.tsx`:

```typescript
{
  id: '5',
  title: 'Your New Experiment',
  description: 'Description of the experiment...',
  videoId: 'youtube_video_id',
  githubRepo: 'repository-name',
  phase: 'phase-1',
  views: '500',
  stars: '12',
  status: 'published'
}
```

### Updating Phase Information
Modify the phases array in `PhaseTimeline.tsx`:

```typescript
{
  id: 1,
  title: 'Your Phase Title', 
  description: 'Timeline and description',
  status: 'active', // 'active' | 'upcoming' | 'future'
  icon: '🧪'
}
```

## 🌈 Customization

### Colors
Update Tailwind config in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-primary-color',
    600: '#your-primary-dark',
  },
  // ... other colors
}
```

### Animations
Modify animation duration and easing in components:

```typescript
transition={{ duration: 0.8, delay: 0.2 }}
```

### 3D Elements
Customize shapes in `ThreeDShape.tsx`:

```typescript
<ThreeDShape 
  type="cube" 
  color="primary" 
  size="lg" 
  animate={true} 
/>
```

## 📈 Performance

- **Static Site Generation** for optimal loading
- **Image optimization** with Next.js Image component
- **Code splitting** for reduced bundle size
- **Lazy loading** for animations and heavy components

## 🚀 Deployment

This landing page is deployed as part of the unified ProjectAlita GitHub Pages deployment.

### Automatic Deployment
Push to `main` branch automatically triggers deployment via GitHub Actions:
- Landing page deployed to: `https://elitea.ai/`
- Documentation deployed to: `https://elitea.ai/docs/`

### Manual Testing Before Deploy
```bash
# From repository root
./scripts/build-all.sh      # Build both landing + docs
./scripts/serve-built.sh    # Preview unified site at localhost:8080
```

See [main README](../README.md) for complete deployment documentation.

## 🎨 Design Philosophy

This React version maintains the analytical-yet-inviting aesthetic while adding:

- **Component reusability** for easy content updates
- **Smooth animations** that respect user preferences
- **3D visual elements** that enhance without overwhelming
- **Responsive design** that works across all devices
- **Performance optimization** for fast loading

The design balances technical credibility with visual appeal, perfect for showcasing practical AI experiments to both technical and business audiences.

## 🔗 Integration

- **YouTube API**: Ready for dynamic video data
- **GitHub API**: Prepared for live repository stats  
- **Analytics**: Google Analytics/Vercel Analytics ready
- **SEO**: Optimized metadata and structured data

---

**Built with ❤️ for the Applied AI community**  
Where AI gets practical, one experiment at a time.