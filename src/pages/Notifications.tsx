import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Check } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const { currentUser, notifications, markNotificationAsRead } = useApp();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userNotifications = notifications.filter(n => n.userId === currentUser.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    return <Bell className="h-5 w-5" />;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking': return 'default';
      case 'promotion': return 'secondary';
      case 'update': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>

        {userNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <BellOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No notifications</h2>
            <p className="text-muted-foreground mb-6">
              We'll notify you when there's something new
            </p>
            <Button onClick={() => navigate('/hotels')}>Browse Hotels</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {userNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 ${!notification.read ? 'border-primary' : ''}`}
              >
                <div className="flex gap-4">
                  <div className="p-3 rounded-full bg-primary/10 h-fit">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="h-5 px-2 text-xs">New</Badge>
                        )}
                      </div>
                      <Badge variant={getNotificationColor(notification.type) as any}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </p>
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="mt-2"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
