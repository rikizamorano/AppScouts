
import React, { useState, useCallback, useMemo } from 'react';
import { User, Role, Page, ScoutGroup, Beneficiary } from './types';
import { initialUsers, initialGroups, initialBeneficiaries } from './constants';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterGroupPage from './pages/RegisterGroupPage';
import RegisterBeneficiaryPage from './pages/RegisterBeneficiaryPage';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [groups, setGroups] = useState<ScoutGroup[]>(initialGroups);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(initialBeneficiaries);

  const handleLogin = useCallback((rut: string, pass: string) => {
    const user = users.find(u => u.rut === rut);
    if (user && user.password === pass) {
      setCurrentUser(user);
      setCurrentPage(Page.Dashboard);
      return true;
    }
    return false;
  }, [users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage(Page.Login);
  }, []);
  
  const addScoutGroup = useCallback((group: ScoutGroup, adminUser: User) => {
    setGroups(prev => [...prev, group]);
    setUsers(prev => [...prev, adminUser]);
    setCurrentPage(Page.Login);
  }, []);

  const addBeneficiary = useCallback((beneficiary: Beneficiary, beneficiaryUser: User) => {
    setBeneficiaries(prev => [...prev, beneficiary]);
    setUsers(prev => [...prev, beneficiaryUser]);
    setCurrentPage(Page.Login);
  }, []);

  const updateGroup = useCallback((updatedGroup: ScoutGroup) => {
    setGroups(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));
  }, []);

  const updateBeneficiary = useCallback((updatedBeneficiary: Beneficiary) => {
    setBeneficiaries(prev => prev.map(b => b.id === updatedBeneficiary.id ? updatedBeneficiary : b));
  }, []);

  const approvedGroups = useMemo(() => groups.filter(g => g.status === 'approved'), [groups]);

  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case Page.RegisterGroup:
          return <RegisterGroupPage onRegister={addScoutGroup} navigateToLogin={() => setCurrentPage(Page.Login)} />;
        case Page.RegisterBeneficiary:
          return <RegisterBeneficiaryPage onRegister={addBeneficiary} approvedGroups={approvedGroups} navigateToLogin={() => setCurrentPage(Page.Login)} />;
        case Page.Login:
        default:
          return <LoginPage onLogin={handleLogin} navigateToRegisterGroup={() => setCurrentPage(Page.RegisterGroup)} navigateToRegisterBeneficiary={() => setCurrentPage(Page.RegisterBeneficiary)} />;
      }
    }

    if (currentPage === Page.Dashboard) {
        return (
            <DashboardPage
                user={currentUser}
                groups={groups}
                beneficiaries={beneficiaries}
                updateGroup={updateGroup}
                updateBeneficiary={updateBeneficiary}
                addBeneficiary={addBeneficiary}
            />
        );
    }
    
    return <LoginPage onLogin={handleLogin} navigateToRegisterGroup={() => setCurrentPage(Page.RegisterGroup)} navigateToRegisterBeneficiary={() => setCurrentPage(Page.RegisterBeneficiary)} />;
  };

  return (
    <div className="min-h-screen bg-scout-light-gray">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
