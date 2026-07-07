# AI-Assisted Development Prompt Log

**Project:** Airbnb-Clone App
**Tools Used:** Gemini (Google) for architecture planning, component scaffolding, and AI integration.

### Sequence of Key Prompts:
1. **Initial Setup & LLD:** "i got this project and i want complete this project, on frontend i want to use jsx and backend node. Let's start Before start please tell me which tech stack we are going to use."
2. **Sub-agent Config:** "We will intergrate AI in this project to make it more powerfull let's do overEngineerd for this project here i have groq api key." -> *Resulted in the creation of the .cursorrules file and Groq configuration.*
3. **Dynamic Database Initialization:** "please make it a dynamic app so all db import must be dynamic so it does not create a conflict while deploying. And when we are going to use DB i have created a new supabase account"
4. **UI Execution (Photo Tour):** "Phase 1: The 'Photo Tour' View (Frontend LLD) The rubric explicitly requires a third view: the 'Photo Tour.' Right now, your 'Show all photos' button opens the Lightbox. We need it to open a full-page, scrollable masonry grid..."
5. **AI Integration (Groq/Llama 3):** "Now let's Move to Phase 2: Groq AI Integration (Full-Stack AI). Update your mock data payload to include description and a robust amenities array so the AI has context to read... Replace the static text with the dynamically generated, animated AI text."
6. **System Architecture (HLD):** "Phase 3: The System Architecture Diagram (HLD)... Map out the production environment. We will document: Client devices → CDN (Cloudflare) → API Gateway → Microservices..."