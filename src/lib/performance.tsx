
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

// Performance metrics interface
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
}

// Performance monitoring class
class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.reportMetric('lcp', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID Observer
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
      this.reportMetric('fid', this.metrics.fid);
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // CLS Observer
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cls = clsValue;
      this.reportMetric('cls', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    this.observers.push(lcpObserver, fidObserver, clsObserver);
  }

  private reportMetric(name: string, value: number) {
    // Report to Sentry
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${name}: ${value}`,
      level: 'info',
    });

    // Report to analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
      });
    }
  }

  public measureTimeToFirstByte() {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.reportMetric('ttfb', this.metrics.ttfb);
    }
  }

  public measureFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      this.metrics.fcp = fcpEntry.startTime;
      this.reportMetric('fcp', this.metrics.fcp);
    }
  }

  public measureFirstMeaningfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fmpEntry = paintEntries.find(entry => entry.name === 'first-meaningful-paint');
    if (fmpEntry) {
      this.metrics.fmp = fmpEntry.startTime;
      this.reportMetric('fmp', this.metrics.fmp);
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Measure initial metrics
    performanceMonitor.measureTimeToFirstByte();
    performanceMonitor.measureFirstContentfulPaint();
    performanceMonitor.measureFirstMeaningfulPaint();

    // Cleanup
    return () => {
      performanceMonitor.disconnect();
    };
  }, []);

  return {
    getMetrics: () => performanceMonitor.getMetrics(),
  };
};

// Component performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  return function WithPerformanceMonitoring(props: P) {
    useEffect(() => {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;

        // Report component render time
        Sentry.addBreadcrumb({
          category: 'performance',
          message: `${componentName} render time: ${renderTime}ms`,
          level: 'info',
        });

        if (renderTime > 100) {
          Sentry.captureMessage(
            `Slow component render: ${componentName}`,
            'warning'
          );
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// Route change performance monitoring
export const useRouteChangeMonitoring = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        const routeChangeTime = endTime - startTime;

        Sentry.addBreadcrumb({
          category: 'performance',
          message: `Route change time: ${routeChangeTime}ms`,
          level: 'info',
        });

        if (routeChangeTime > 300) {
          Sentry.captureMessage(
            'Slow route change detected',
            'warning'
          );
        }
      };
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);
};

// Resource loading performance monitoring
export const useResourceLoadingMonitoring = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
          Sentry.captureMessage(
            `Slow resource load: ${entry.name}`,
            'warning'
          );
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    return () => observer.disconnect();
  }, []);
};
