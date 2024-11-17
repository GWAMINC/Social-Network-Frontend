<div className="chatroom-container">
            <div className="feature-sidebar">
                <button onClick={openModal} className="calendar-button">
                    Calendar
                </button>

                {showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="calendar-container">
                                <style>
                                    {`
                                    .bg-gradient::after {
                                        background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.6), transparent 20%);
                                    }
                                    `}
                                </style>
                                <div className="flex flex-col items-center justify-center px-6 bg-gray-900 rounded-lg">
                                    <h1 className="text-2xl font-bold text-center text-white mb-4">Calendar</h1>

                                    {/* Selector cho năm và tháng */}
                                    <div className="flex gap-4 mb-4">
                                        <select 
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                            className="bg-gray-800 text-white p-2 rounded"
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>

                                        <select 
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                            className="bg-gray-800 text-white p-2 rounded"
                                        >
                                            {months.map((month, index) => (
                                                <option key={index} value={index}>{month}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Tiêu đề các ngày trong tuần */}
                                    <div className="grid w-full grid-cols-7 gap-1 text-blue-300">
                                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                                            <p key={idx} className="flex items-center justify-center h-12">
                                                {day}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Các ô ngày trong tháng */}
                                    <div className="grid w-full grid-cols-7 gap-1 mt-2">
                                        {createDaysArray().map((day, index) => (
                                            <div 
                                                key={index} 
                                                className={`relative cursor-pointer bg-gradient after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:opacity-0 hover:after:opacity-50 ${
                                                    day === null ? 'invisible' : ''
                                                }`}
                                                onMouseMove={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                                                }}
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-lg">
                                                    {day}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="blur-background"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>