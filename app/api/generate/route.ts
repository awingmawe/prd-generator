import { NextResponse } from "next/server";

export const SYSTEM_PROMPT = `
Anda adalah Senior Product Manager, Lead System Architect, dan Business Analyst di perusahaan Big Tech. 
Tugas Anda adalah menulis Product Requirements Document (PRD) yang SANGAT DETAIL, KOMPLEKS, dan TEKNIS.

PRD WAJIB mengandung struktur berikut:
1. **Executive Summary**: Visi strategis dan problem statement.
2. **Target Audience & Persona**: Detail siapa yang menggunakan dan mengapa.
3. **User Stories (Detailed)**: Minimal 5-7 stories dengan Acceptance Criteria yang ketat.
4. **Functional & Non-Functional Requirements**: Termasuk aspek scalability, security (OAuth2, JWT), dan performance (latency <200ms).
5. **Detailed System Architecture**: Gunakan Mermaid graph TD. Visualisasikan alur microservices, load balancer, caching (Redis), dan DB.
6. **Complex Entity-Relationship Diagram (ERD)**: Gunakan Mermaid erDiagram. Minimal 5-7 tabel yang saling berelasi.
7. **API Endpoints Specification**: Definisikan minimal 3 core endpoints (Method, Path, Payload, Success Response).
8. **Edge Cases & Error Handling**: Apa yang terjadi jika sistem down, input salah, atau race condition.
9. **Success Metrics (KPIs)**: Bagaimana mengukur keberhasilan fitur ini.

ATURAN KETAT:
- JANGAN gunakan field 'room_type' dalam entitas apapun.
- Gunakan bahasa Indonesia yang sangat profesional dan teknis.
- Pastikan blok kode mermaid dibungkus dengan \`\`\`mermaid.
- Jawaban harus panjang, komprehensif, dan "ready to build" bagi tim engineering.
`;

export async function POST(req: Request) {
  try {
    const { name, description, features } = await req.json();

    // Simulasi pemanggilan AI (Mock API Call)
    // Dalam implementasi nyata, Anda akan menggunakan OpenAI SDK atau sejenisnya di sini.
    
    // Memberikan delay buatan untuk simulasi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResponse = `
# PRD: ${name}

## 1. Ringkasan Proyek
${description}

## 2. User Stories
- Sebagai Pengguna, saya ingin dapat mengakses fitur utama aplikasi sehingga kebutuhan saya terpenuhi.
- Sebagai Admin, saya ingin mengelola data sistem agar operasional berjalan lancar.

## 3. Functional Requirements
${features.split('\n').map(f => `- ${f}`).join('\n')}

## 4. Arsitektur Sistem
\`\`\`mermaid
graph TD
    User[Pengguna] --> Web[Web Portal]
    Web --> API[Backend API]
    API --> DB[(Database)]
    API --> AI[AI Engine]
\`\`\`

## 5. Entity-Relationship Diagram (ERD)
\`\`\`mermaid
erDiagram
    PROJECT ||--o{ FEATURE : contains
    PROJECT {
        string name
        string description
    }
    FEATURE {
        string title
        string priority
    }
    USER ||--o{ PROJECT : owns
    USER {
        string username
        string email
    }
\`\`\`
    `.trim();

    return NextResponse.json({ result: mockResponse });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghasilkan PRD" }, { status: 500 });
  }
}
