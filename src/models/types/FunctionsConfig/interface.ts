export interface FunctionsConfigInterface {
  /**
   * firebase basic config (do not change manually)
   */
  firebase: {
    /**
     * firebase database url
     */
    databaseURL: string;
    /**
     * firebase storage bucket name
     */
    storageBucket: string;
    /**
     * firebase project id
     */
    projectId: string;
    [k: string]: unknown;
  };
  /**
   * Web services settings
   */
  web: {
    /**
     * firebase api key
     */
    apikey: string;
    [k: string]: unknown;
  };
  /**
   * Website settings
   */
  site: {
    /**
     * web site name
     */
    name: string;
    /**
     * web site url
     */
    url: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
