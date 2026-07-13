import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageHeader } from '../components/ui/index.jsx';

// Role-specific imports
import SuperAdminView from '../components/dashboard/super_admin.jsx';
import EsgManagerView from '../components/dashboard/esg_manager.jsx';
import EmployeeView from '../components/dashboard/employee.jsx';
import AuditorView from '../components/dashboard/auditor.jsx';
import ExecutiveView from '../components/dashboard/executive.jsx';
import DepartmentHeadView from '../components/dashboard/department_head.jsx';
import CsrManagerView from '../components/dashboard/csr_manager.jsx';
import ComplianceOfficerView from '../components/dashboard/compliance_officer.jsx';
import GamificationManagerView from '../components/dashboard/gamification_manager.jsx';
import ViewerView from '../components/dashboard/viewer.jsx';

const ROLE_DASHBOARDS = {
    super_admin: { component: SuperAdminView, title: '👑 Super Admin Dashboard' },
    esg_manager: { component: EsgManagerView, title: '🌿 ESG Manager Dashboard' },
    employee: { component: EmployeeView, title: '👤 Employee Dashboard' },
    auditor: { component: AuditorView, title: '🔍 Auditor Dashboard' },
    executive: { component: ExecutiveView, title: '📊 Executive Boardroom' },
    department_head: { component: DepartmentHeadView, title: '🏢 Department Head Dashboard' },
    csr_manager: { component: CsrManagerView, title: '🌱 CSR Manager Dashboard' },
    compliance_officer: { component: ComplianceOfficerView, title: '⚖️ Compliance Officer Dashboard' },
    gamification_manager: { component: GamificationManagerView, title: '🎮 Gamification Manager Dashboard' },
    viewer: { component: ViewerView, title: '👀 Viewer Board' },
};

export default function Dashboard() {
    const { user } = useAuth();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const tab = query.get('tab') || 'overview';
    const role = user?.role || 'employee';

    const currentDashboard = ROLE_DASHBOARDS[role] || ROLE_DASHBOARDS.employee;
    const DashboardComponent = currentDashboard.component;

    // Helper to format tab label
    const formatTabLabel = (str) => {
        if (!str || str === 'overview') return 'Overview';
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="pb-20 mt-4">
            <PageHeader
                title={currentDashboard.title}
                subtitle={`Welcome, ${user?.name || 'User'}. Viewing: ${formatTabLabel(tab)}`}
                action={
                    <span className="px-3 py-1 text-xs bg-white/5 border border-[var(--border-glass)] rounded-full text-slate-300 font-semibold uppercase">
                        Role: {role.replace('_', ' ')}
                    </span>
                }
            />

            <div className="mt-6">
                <DashboardComponent tab={tab} />
            </div>
        </div>
    );
}
