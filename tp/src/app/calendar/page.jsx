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
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          contentClassNames={[
            'flex-grow',
            'bg-white',
            'text-black',
            'flex',
            'flex-col',
            'font-medium',
          ]}
          dayCellClassNames={() =>
            'border border-gray-200 hover:bg-purple-100 transition-colors cursor-pointer rounded-lg p-1 text-black'
          }
          // 🟢 Aqui alteramos o estilo do nome dos dias da semana
          dayHeaderClassNames={() =>
            'text-black font-semibold text-sm bg-gray-100 py-2'
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
      className="bg-purple-600 text-white rounded-lg px-2 py-1 text-xs font-semibold truncate shadow hover:bg-purple-700 transition-colors cursor-pointer"
      title={eventInfo.event.title}
    >
      {eventInfo.event.title}
    </div>
  );
}

export default FullCalendarComponent;
