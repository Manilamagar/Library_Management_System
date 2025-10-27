import React, { useState } from 'react';

const Home = () => {
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMenu = (menuKey) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const menuItems = [
        {
            key: 'academic',
            title: 'Academic',
            icon: '🎓',
            hasSubmenu: true,
            subItems: [
                {
                    key: 'classroom',
                    title: 'Classroom Activities',
                    icon: '🎓',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'assignment', title: 'Assignment', icon: '📋' },
                        { key: 'homework', title: 'Homework', icon: '📝' },
                        { key: 'check-homework', title: 'Check Homework', icon: '✅' },
                        { key: 'reading-materials', title: 'Reading Materials', icon: '📖' },
                        { key: 'daily-report', title: 'Daily Report', icon: '📊' },
                        { key: 'routine', title: 'Routine', icon: '⏰' }
                    ]
                },
                {
                    key: 'class-evaluation',
                    title: 'Class Evaluation',
                    icon: '📈',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'evaluation-areas', title: 'Evaluation Areas', icon: '📋' },
                        { key: 'assign-evaluation-areas', title: 'Assign Evaluation Areas', icon: '📌' },
                        { key: 'add-evaluation', title: 'Add Evaluation', icon: '➕' }
                    ]
                },
                {
                    key: 'analytics',
                    title: 'Analytics',
                    icon: '📊',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'monitor-supervisor', title: 'Monitor Supervisor', icon: '👁️' },
                        { key: 'homework-analytics', title: 'Homework', icon: '📝' },
                        { key: 'staff-analytics', title: 'Staff', icon: '👥' },
                        { key: 'online-class-report', title: 'Online Class Report', icon: '💻' },
                        { key: 'weekly-report', title: 'Weekly Report', icon: '📅' }
                    ]
                }
            ]
        },
        {
            key: 'notifications',
            title: 'Notifications',
            icon: '🔔',
            hasSubmenu: true,
            subItems: [
                { key: 'push-notification', title: 'Push Notification', icon: '🔔' },
                { key: 'suggestion-appreciation', title: 'Suggestion/Appreciation', icon: '💬' },
                { key: 'sms-notification', title: 'SMS Notification', icon: '📱' },
                { key: 'visitors-record', title: "Visitor's Record", icon: '📋' },
                { key: 'import-account', title: 'Import Account', icon: '📥' }
            ]
        },
        {
            key: 'student',
            title: 'Student Management',
            icon: '👨‍🎓',
            hasSubmenu: true,
            subItems: [
                {
                    key: 'student',
                    title: 'Student',
                    icon: '👨‍🎓',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'search', title: 'Search', icon: '🔍' },
                        { key: 'student-list', title: 'Student List', icon: '📋' },
                        { key: 'add-student', title: 'Add Student', icon: '➕' },
                        { key: 'import-students', title: 'Import Students (Add/Update)', icon: '📥' },
                        { key: 'bulk-edit', title: 'Bulk Edit', icon: '✏️' },
                        { key: 'student-image-bulk-upload', title: 'Student Image Bulk Upload', icon: '🖼️' },
                        { key: 'student-document-bulk-upload', title: 'Student Document Bulk Upload', icon: '📄' },
                        { key: 'group', title: 'Group', icon: '👥' },
                        { key: 'student-evaluation', title: 'Student Evaluation', icon: '📊' },
                        { key: 'admit-card', title: 'Admit Card', icon: '🎫' },
                        { key: 'certificates', title: 'Certificates', icon: '🏆' }
                    ]
                },
                {
                    key: 'report',
                    title: 'Report',
                    icon: '📊',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'print-data', title: 'Print Data', icon: '🖨️' },
                        { key: 'download-data', title: 'Download Data', icon: '💾' },
                        { key: 'students-group', title: 'Students Group', icon: '👥' },
                        { key: 'new-student', title: 'New Student', icon: '🆕' },
                        { key: 'left-student', title: 'Left Student', icon: '🚪' },
                        { key: 'gender-report', title: 'Gender Report', icon: '👫' },
                        { key: 'team-report', title: 'Team Report', icon: '👥' },
                        { key: 'remarks-report', title: 'Remarks Report', icon: '💭' },
                        { key: 'uploaded-documents', title: 'Uploaded Documents', icon: '📁' },
                        { key: 'lunch-students', title: 'Lunch Students', icon: '🍽️' },
                        { key: 'merit', title: 'Merit', icon: '🏅' }
                    ]
                }
            ]
        },
        {
            key: 'staff',
            title: 'Staff Management',
            icon: '👥',
            hasSubmenu: true,
            subItems: [
                {
                    key: 'staff',
                    title: 'Staff',
                    icon: '👥',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'add-edit-staff', title: 'Add/Edit', icon: '✏️' },
                        { key: 'staff-list', title: 'List', icon: '📋' },
                        { key: 'staff-position', title: 'Staff Position', icon: '💼' },
                        { key: 'staff-qualification', title: 'Staff Qualification', icon: '🎓' },
                        { key: 'user-type', title: 'User Type', icon: '👤' },
                        { key: 'import-staffs', title: 'Import Staffs', icon: '📥' },
                        { key: 'assign-user-type', title: 'Assign User Type', icon: '🔗' },
                        { key: 'vacancy', title: 'Vacancy', icon: '📢' },
                        { key: 'update-staff', title: 'Update Staff', icon: '🔄' }
                    ]
                },
                {
                    key: 'staff-reports',
                    title: 'Reports',
                    icon: '📊',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'print-data-staff', title: 'Print Data', icon: '🖨️' },
                        { key: 'download-data-staff', title: 'Download Data', icon: '💾' },
                        { key: 'recruitment-report', title: 'Recruitment Report', icon: '📈' },
                        { key: 'staff-documents', title: 'Staff Documents', icon: '📁' },
                        { key: 'staff-leave-notes', title: 'Staff Leave Notes', icon: '📝' }
                    ]
                }
            ]
        },
        {
            key: 'attendance',
            title: 'Attendance Management',
            icon: '📅',
            hasSubmenu: true,
            subItems: [
                {
                    key: 'attendance',
                    title: 'Attendance',
                    icon: '📅',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'daily-attendance', title: 'Daily Attendance', icon: '📊' },
                        { key: 'daily-attendance-qr', title: 'Daily Attendance (QR)', icon: '📱' },
                        { key: 'bus-attendance-qr', title: 'Bus Attendance (QR)', icon: '🚌' },
                        { key: 'group-attendance', title: 'Group Attendance', icon: '👥' },
                        { key: 'leave-notes', title: 'Leave Notes', icon: '📝' }
                    ]
                },
                {
                    key: 'lunch',
                    title: 'Lunch',
                    icon: '🍽️',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'lunch-attendance', title: 'Lunch Attendance', icon: '🍽️' },
                        { key: 'lunch-report', title: 'Lunch Report', icon: '📊' },
                        { key: 'lunch-form', title: 'Lunch Form', icon: '📋' }
                    ]
                },
                {
                    key: 'attendance-reports',
                    title: 'Reports',
                    icon: '📊',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'bus-attendance', title: 'Bus Attendance', icon: '🚌' },
                        { key: 'group-attendance-report', title: 'Group Attendance', icon: '👥' }
                    ]
                }
            ]
        },
        {
            key: 'exam',
            title: 'Exam Management',
            icon: '📝',
            hasSubmenu: true,
            subItems: [
                {
                    key: 'exam-configuration',
                    title: 'Exam Configuration',
                    icon: '⚙️',
                    hasSubmenu: true,
                    subItems: [
                        { key: 'add-exam', title: 'Add Exam', icon: '➕' },
                        { key: 'print-exam-routine', title: 'Print Exam Routine', icon: '🖨️' },
                        { key: 'selective-remarks', title: 'Selective Remarks', icon: '📝' },
                        { key: 'selective-remarks-list', title: 'Selective Remarks List', icon: '📋' },
                        { key: 'student-specific-remarks', title: 'Student Specific Remarks', icon: '👨‍🎓' },
                        { key: 'subject-specific-remarks', title: 'Subject Specific Remarks', icon: '📚' },
                        { key: 'manual-attendance', title: 'Manual Attendance', icon: '✍️' },
                        { key: 'subject-attendance', title: 'Subject Attendance', icon: '📊' },
                        { key: 'group-class-association', title: 'Group Class Association', icon: '🔗' },
                        { key: 'mobile-app-settings', title: 'Mobile App Settings', icon: '📱' }
                    ]
                },
                { key: 'exams', title: 'Exams', icon: '📝', hasSubmenu: false },
                { key: 'ledgers', title: 'Ledgers', icon: '📊', hasSubmenu: false },
                { key: 'general-evaluation', title: 'General Evaluation', icon: '📈', hasSubmenu: false },
                { key: 'cas', title: 'CAS', icon: '📋', hasSubmenu: false },
                { key: 'selective-exam', title: 'Selective Exam', icon: '🎯', hasSubmenu: false }
            ]
        },
        {
            key: 'library',
            title: 'Library Management',
            icon: '📚',
            hasSubmenu: true
        },
        {
            key: 'admission',
            title: 'Admission Portal',
            icon: '⭐',
            hasSubmenu: true
        },
        {
            key: 'elearning',
            title: 'E-Learning',
            icon: '💻',
            hasSubmenu: true
        },
        {
            key: 'content',
            title: 'Content Management',
            icon: '🌐',
            hasSubmenu: true
        },
        {
            key: 'settings',
            title: 'Settings',
            icon: '⚙️',
            hasSubmenu: true
        },
        {
            key: 'tools',
            title: 'Tools/Extras',
            icon: '🔧',
            hasSubmenu: true
        },
        {
            key: 'account',
            title: 'Account',
            icon: '👤',
            hasSubmenu: true
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="flex flex-col w-72 bg-white shadow-lg">
                {/* College Header */}
                <div className="flex flex-col items-center p-6 bg-gradient-to-b from-green-600 to-green-700 text-white">
                    <div className="w-16 h-16 mb-3 bg-white rounded-full flex items-center justify-center">
                        
                         <img src="https://namunacollege.edu.np/wp-content/uploads/2024/03/Itahari-Namuna-College.jpg" alt="Logo" class="h-8 w-auto"></img>
                    </div>
                    <h2 className="text-lg font-bold text-center">INC Pustakalaya</h2>
                    <div className="mt-2 text-sm opacity-90">
                        <div>Client ID: N-0195</div>
                        <div>Academic Year: 2082</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search menus" 
                            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => (
                        <div key={item.key} className="mb-1">
                            <button
                                onClick={() => item.hasSubmenu && toggleMenu(item.key)}
                                className="w-full flex items-center justify-between px-6 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                {item.hasSubmenu && (
                                    <span className={`transition-transform duration-200 ${expandedMenus[item.key] ? 'rotate-90' : ''}`}>
                                        ▶
                                    </span>
                                )}
                            </button>
                            
                            {/* First Level Submenu */}
                            {item.hasSubmenu && expandedMenus[item.key] && item.subItems && (
                                <div className="bg-gray-50">
                                    {item.subItems.map((subItem) => (
                                        <div key={subItem.key} className="ml-6">
                                            <button
                                                onClick={() => subItem.hasSubmenu && toggleMenu(subItem.key)}
                                                className="w-full flex items-center justify-between px-6 py-2 text-left text-gray-600 hover:text-green-600 hover:bg-white transition-colors duration-200 text-sm border-l-2 border-green-200"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm">{subItem.icon}</span>
                                                    <span className="font-medium">{subItem.title}</span>
                                                </div>
                                                {subItem.hasSubmenu && (
                                                    <span className={`transition-transform duration-200 text-xs ${expandedMenus[subItem.key] ? 'rotate-90' : ''}`}>
                                                        ▶
                                                    </span>
                                                )}
                                            </button>
                                            
                                            {/* Second Level Submenu */}
                                            {subItem.hasSubmenu && expandedMenus[subItem.key] && subItem.subItems && (
                                                <div className="bg-white ml-4">
                                                    {subItem.subItems.map((subSubItem) => (
                                                        <div key={subSubItem.key} className="ml-6">
                                                            <button className="w-full flex items-center px-6 py-2 text-left text-gray-500 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 text-sm">
                                                                <span className="text-xs mr-3">{subSubItem.icon}</span>
                                                                <span>{subSubItem.title}</span>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Simple submenu for items without complex structure */}
                            {item.hasSubmenu && expandedMenus[item.key] && !item.subItems && (
                                <div className="bg-gray-50 border-l-2 border-green-200 ml-6">
                                    <div className="py-2 px-6 text-sm text-gray-600 hover:text-green-600 hover:bg-white cursor-pointer transition-colors">
                                        {item.title} Overview
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Header */}
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-6">
                    <div className="flex items-center">
                        <div className="relative">
                            <input 
                                className="border border-gray-300 h-10 w-96 px-5 pr-12 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                type="search" 
                                placeholder="Search" 
                            />
                            <button className="absolute right-3 top-3 text-gray-400">
                                🔍
                            </button>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-green-600 transition-colors text-xl">
                            🔔
                        </button>
                        <button className="text-gray-600 hover:text-green-600 transition-colors text-xl">
                            ⚙️
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                            <span className="text-xl">🚪</span>
                            <span className="font-medium">Login</span>
                            <span className="font-medium">Register</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to College Management System!</h1>
                        <p className="text-gray-600 mb-8">Manage all aspects of INC Pustakalaya efficiently with our comprehensive dashboard.</p>
                        
                        {/* Dashboard Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-100 rounded-lg text-2xl">
                                        👨‍🎓
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Total Students</p>
                                        <p className="text-2xl font-semibold text-gray-800">1,234</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 bg-green-100 rounded-lg text-2xl">
                                        👥
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Staff Members</p>
                                        <p className="text-2xl font-semibold text-gray-800">89</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 bg-yellow-100 rounded-lg text-2xl">
                                        📚
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Library Books</p>
                                        <p className="text-2xl font-semibold text-gray-800">5,678</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 bg-purple-100 rounded-lg text-2xl">
                                        🏢
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Active Courses</p>
                                        <p className="text-2xl font-semibold text-gray-800">24</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        📝
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">New exam schedule published</p>
                                        <p className="text-xs text-gray-600">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        👨‍🎓
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">25 new student admissions</p>
                                        <p className="text-xs text-gray-600">1 day ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                        📚
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Library system updated</p>
                                        <p className="text-xs text-gray-600">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;