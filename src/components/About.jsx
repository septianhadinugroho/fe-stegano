import React from 'react';

const About = () => {
  const team = [
    { name: 'Muqtada Hasby Abdalla', role: 'IT Support', img: 'https://picsum.photos/seed/septian/200' },
    { name: 'Refa Muhammad', role: 'Algorithm Developer', img: 'https://picsum.photos/seed/john/200' },
    { name: 'Septian Hadi Nugroho', role: 'Fullstack Developer', img: 'https://picsum.photos/seed/jane/200' },
    { name: 'Yusuf Ginanjar', role: 'DevOps Engineer', img: 'https://picsum.photos/seed/alex/200' },
  ];

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Tentang Kami</h2>
      <p className="mb-8 text-center max-w-2xl mx-auto">
        Aplikasi ini adalah alat untuk menyembunyikan pesan rahasia di dalam gambar menggunakan teknik steganografi.
        Kami menggunakan teknologi modern untuk memberikan pengalaman terbaik bagi Anda.
      </p>

      <div className="divider">Tim Pengembang</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <div 
            key={index} 
            className="card bg-base-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={member.img} alt={member.name} />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{member.name}</h2>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;