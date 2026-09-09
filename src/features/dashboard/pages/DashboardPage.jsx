import styles from './DashboardPage.module.css';
import { useEffect, useState } from 'react';
import { useNotification } from '../../../context/NotificationContext';
import { useRealtimeNotifications } from '../../../context/RealtimeNotificationsContext';
import StatCard from '../components/StatCard/StatCard';
import RequestsCard from '../components/RequestsCard/RequestsCard';
import SuggestionsCard from '../components/SuggestionsCard/SuggestionsCard';
import TakeawayCard from '../components/TakeAwayCard/TakeAwayCard';
import MenuStatusCard from '../components/MenuStatusCard/MenuStatusCard';
import dishSuggestionsService from '../../../features/suggestions/services/dishSuggestionService';
import menuService from '../../menus/services/menuService';
import ingredientRequestService from '../../ingredient-requests/services/ingredientRequestService';
import takeawayOfferService from '../../takeaway-offers/services/takeawayOfferService';

const DashboardPage = () => {
  const { snapshot } = useRealtimeNotifications();
  const { notify } = useNotification();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [menusLoading, setMenusLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await dishSuggestionsService.getAll({ limit: 5, orderBy: 'createdAt' });
        setSuggestions(suggestions);
      } catch (error) {
        notify('error', error.message || 'Kunne ikke hente forslag');
      } finally {
        setSuggestionsLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await menuService.getAll({ limit: 5 });
        setMenus(menus);
      } catch (error) {
        notify('error', error.message || 'Kunne ikke hente menuer');
      } finally {
        setMenusLoading(false);
      }
    };
    fetchMenus();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await ingredientRequestService.getAll({ limit: 5 });
        setRequests(requests);
      } catch (error) {
        notify('error', error.message || 'Kunne ikke hente anmodninger');
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await takeawayOfferService.getAll();
        setOffers(offers);
      } catch (error) {
        notify('error', error.message || 'Kunne ikke hente tilbud');
      } finally {
        setOffersLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const activeOffers = offers.filter((o) => o.enabled && !o.soldOut);
  const totalPortions = offers.reduce((sum, o) => sum + o.offeredPortions, 0);

  return (
    <div className={styles.contentArea}>
      <StatCard
        title="Ventende forslag"
        value={snapshot.pendingDishSuggestions}
        subtext="Kræver din godkendelse"
        cols={4}
        isLoading={!snapshot}
      />

      <StatCard
        title="Vareanmodninger"
        subtext="Kræver din godkendelse"
        value={snapshot.pendingIngredientRequests}
        cols={4}
        isLoading={!snapshot}
      />

      <StatCard
        title="Aktive takeaway tilbud"
        subtext={`${totalPortions} portioner til salg`}
        value={activeOffers.length}
        cols={4}
        isLoading={offersLoading}
      />

      <RequestsCard 
      cols={8} 
      requests={requests}
      isLoading={requestsLoading} 
      />

      <TakeawayCard 
      cols={4} offers={offers} 
      isLoading={offersLoading} 
      />

      <SuggestionsCard
        cols={6}
        suggestions={suggestions}
        isLoading={suggestionsLoading}
      />

      <MenuStatusCard 
      cols={6} menus={menus} 
      isLoading={menusLoading} 
      />
    </div>
  );
};

export default DashboardPage;
