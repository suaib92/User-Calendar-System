import React from 'react';
import { Button } from '@/components/ui/button'; 

const Header = () => {
    return (
        <div className="flex flex-col ">
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <Button >Add Event</Button>
        </header>
        
          </div>
    );
};

export default Header;
