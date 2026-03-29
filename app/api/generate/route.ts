import { NextResponse } from "next/server";

export const SYSTEM_PROMPT = `
Anda adalah Senior Product Manager dan System Architect. 
Tugas Anda adalah menulis Product Requirements Document (PRD) terstruktur dengan format Markdown yang rapi berdasarkan input pengguna.

PRD WAJIB berisi bagian berikut:
1. **Ringkasan Proyek**: Deskripsi tingkat tinggi.
2. **User Stories**: Daftar dalam format "Sebagai [peran], saya ingin [tindakan] sehingga [manfaat]".
3. **Functional Requirements**: Daftar fitur teknis yang diperlukan.
4. **Arsitektur Sistem**: Gunakan blok kode mermaid (graph TD) untuk memvisualisasikan alur sistem.
5. **Entity-Relationship Diagram (ERD)**: Gunakan blok kode mermaid (erDiagram).

ATURAN KETAT:
- Jangan gunakan field 'room_type' dalam contoh entitas atau skema database apapun.
- Gunakan bahasa Indonesia yang profesional.
- Pastikan blok kode mermaid dibungkus dengan \`\`\`mermaid.
- Hasil akhir harus siap pakai dan mendetail.
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
