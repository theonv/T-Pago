'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Footer from '@/components/footer/footer.jsx';

const FullCalendarComponent = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-8">
      <div className="w-[85vw] h-[85vh] rounded-3xl shadow-2xl bg-white overflow-hidden flex flex-col min-h-0">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          events={[
            { title: 'Evento 1', date: '2025-08-15' },
            { title: 'Evento 2', date: '2025-08-20' },
          ]}
          height="100%"
          expandRows={true}
          aspectRatio={1.35}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'prev,next today',
          }}
          contentClassNames={[
            'flex-grow',
            'bg-white',
            'text-gray-900',
            'flex',
            'flex-col',
          ]}
          dayCellClassNames={() =>
            'border border-gray-300 hover:bg-purple-100 transition-colors cursor-pointer'
          }
          eventContent={renderEventContent}
          titleFormat={{ year: 'numeric', month: 'long' }}
        />
        <Footer />
      </div>
    </main>
  );
};

function renderEventContent(eventInfo) {
  return (
    <div
      className="bg-purple-600 text-white rounded-lg px-3 py-1 text-sm font-semibold truncate shadow-md hover:bg-purple-700 transition-colors cursor-pointer"
      title={eventInfo.event.title}
    >
      {eventInfo.event.title}
    </div>
  );
}

export default FullCalendarComponent;
