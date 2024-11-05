import React from 'react';
import { Mail, User } from 'lucide-react';

interface TeamMember {
  name: string;
  enrollment: string;
  email: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Srishant Kumar',
    enrollment: '23UICS169',
    email: 'Srishant054@gmail.com',
    image: 'https://i.imgur.com/CC0IGFA.jpeg'
  },
  {
    name: 'Harshita Shankar',
    enrollment: '23UICS202',
    email: 'shankarharshita99@gmail.com',
    image: 'https://i.imgur.com/85imDjd.jpeg'
  },
  {
    name: 'Rohan Kumar',
    enrollment: '23UICS092',
    email: 'rohan18126@gmail.com',
    image: 'https://i.imgur.com/XeFwRGj.jpeg'
  },
  {
    name: 'Rayyan Seliya',
    enrollment: '23UICS133',
    email: 'rayyanseliya786@gmail.com',
    image: 'https://i.imgur.com/JP9r3dA.jpeg'
  }
];

export function TeamSection() {
  return (
    <div id="team-section" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Meet Team Hacknomics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The brilliant minds behind this project</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {teamMembers.map((member) => (
          <div key={member.enrollment} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                {member.enrollment}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${member.email}`} className="hover:text-blue-500">
                {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}